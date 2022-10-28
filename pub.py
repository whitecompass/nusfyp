import paho.mqtt.client as mqtt
from time import sleep

host = "localhost"
port = 1883

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Successfully connected to broker. Result code: " + str(rc))
        print("Waiting for 2 seconds.")
        sleep(2)
    else:
        print("Connection failed with code: " + str(rc))

def send_file(client, filename):
    #f = open("//wsl.localhost/Ubuntu/home/vurshlit/fyp/test.zip")
    with open("test.zip", 'rb') as f:
        zipstring = f.read()
    #f = open("test.zip")
    #zipstring = f.read()
    byteArray = bytes(zipstring)
    client.publish("test/zip", byteArray, 0)

def setup(hostname):
    client = mqtt.Client()
    client.on_connect = on_connect
    client.connect(hostname, port, 60)
    client.loop_start()
    return client

def main():
    print("Connecting...")
    client = setup(host)
    print("Sending data...")
    send_file(client, "test.zip")
    print("Done.")
    while True:
        pass

if __name__ == '__main__':
    main()