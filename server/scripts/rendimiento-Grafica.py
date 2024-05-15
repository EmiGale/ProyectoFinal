from dash import Dash, html, dcc
from dash.dependencies import Output, Input
import plotly.graph_objs as go
from collections import deque
from netmiko import ConnectHandler

X = deque(maxlen=20)
X.append(1)
Y = deque(maxlen=100)
Y.append(1)

app = Dash(__name__ )
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

# Función para obtener datos de CPU utilizando Netmiko
def obtener_datos_cpu(device_ip, username, password):
    cisco_device = {
        'device_type': 'cisco_ios',
        'ip': device_ip,
        'username': username,
        'password': password,
    }
    
    try:
        with ConnectHandler(**cisco_device) as net_connect:
            output = net_connect.send_command("show processes cpu", use_textfsm=True)
            cpu_usage = int(output[0]['cpu_5_min'])
            return cpu_usage
    except Exception as e:
        print(f"Error: {e}")
        return None

@app.callback(Output('live-graph', 'figure'),
              [Input('graph-update', 'n_intervals')])
def update_graph_scatter(n):
    # Llama a la función para obtener datos de CPU utilizando Netmiko
    cpu_usage = obtener_datos_cpu('192.168.10.1', 'gmedina', 'cisco')
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

if __name__ == '__main__':
    app.run_server(debug=True)