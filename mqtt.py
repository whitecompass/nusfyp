import paho.mqtt.client as mqtt

host = "localhost"
port = 1883

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Successfully connected to broker. Result code: " + str(rc))
        client.subscribe("test/zip", 0)
    else:
        print("Connection failed with code: " + str(rc))

def on_message(client, userdata, msg):
    print("Receiving file...")
    with open('test.zip', 'wb') as f:
        f.write(msg.payload)


def setup(hostname):
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(hostname, port, 60)
    client.loop_start()
    return client

def main():
    print("Connecting...")
    setup(host)
    while True:
        pass

if __name__ == '__main__':
    main()
