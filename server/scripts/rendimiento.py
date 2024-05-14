from pysnmp.hlapi import *
from dash import Dash, html, dcc
from dash.dependencies import Output, Input
import plotly.graph_objs as go
from collections import deque
import time
from pysnmp.hlapi import *

# Función para obtener datos de CPU utilizando SNMP
def obtener_datos_cpu(ip_address, community_string, oid):
    g = getCmd(SnmpEngine(),
               CommunityData(community_string),
               UdpTransportTarget((ip_address, 161)),
               ContextData(),
               ObjectType(ObjectIdentity(oid)))
    
    response = next(g)
    error_indication, error_status, error_index, var_binds = response
    
    if error_indication:
        print(f'Error: {error_indication}')
        return None
    else:
        if error_status:
            print(f'Error: {error_status.prettyPrint()} at {error_index and var_binds[int(error_index) - 1][0] or "?"}')
            return None
        else:
            for var_bind in var_binds:
                return var_bind[1]  # Devuelve el valor de uso de CPU

X = deque(maxlen=20)
X.append(1)
Y = deque(maxlen=20)
Y.append(1)

app = Dash(_name_)
app.layout = html.Div(
    [
        dcc.Graph(id='live-graph', animate=True),
        dcc.Interval(
            id='graph-update',
            interval=1000,
            n_intervals=0
        ),
    ]
)

@app.callback(Output('live-graph', 'figure'),
              [Input('graph-update', 'n_intervals')])
def update_graph_scatter(n):
    # Llama a la función para obtener datos de CPU utilizando SNMP
    cpu_usage = obtener_datos_cpu('192.168.10.1', 'cisco', '1.3.6.1.4.1.9.9.109.1.1.1.1.8')
    if cpu_usage is not None:
        X.append(X[-1]+1)
        Y.append(cpu_usage)
    
    data = go.Scatter(
        x=list(X),
        y=list(Y),
        name='CPU Usage',
        mode='lines+markers'
    )

    return {'data': [data],'layout': go.Layout(xaxis=dict(range=[min(X),max(X)]),
                                               yaxis=dict(range=[0, 100]),)}

if _name_ == '_main_':
    app.run_server(debug=True)