from ldap3 import Server, Connection, ALL, SUBTREE

from ldap3.core.exceptions import LDAPException, LDAPBindError
from flask import Flask, render_template, jsonify
from dotenv import load_dotenv
import os
from getpass import getuser
import requests
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)



load_dotenv()

# ldap
ldap_server = os.getenv("LDAP_SERVER")
root_dn = os.getenv("ROOT_DN")
ldap_user_name = os.getenv("LDAP_USER_NAME")
ldap_password = os.getenv("LDAP_PASSWORD")
authorization = os.getenv("AUTHORIZATION")
snipeit = os.getenv("SNIPEIT")

CURRENT_USER = getuser()
HEADERS = {
    'Content-Type': 'application/json',
    'Authorization' : authorization,
    # 'Accept':'application/json'
}

@app.route("/")
def home():
    is_in_guestWIFI_group = isInGuesWifiGroup()
    print(f"In WIFI group: {is_in_guestWIFI_group}")
    return render_template('home.html', navbar = [CURRENT_USER, is_in_guestWIFI_group])

@app.route("/users/loggedInUser")
def logged_in_user():
    isInGuestWifiGroup = str(isInGuesWifiGroup())
    current_user = {"loggedInUser":CURRENT_USER, "isInGuestWifiGroup":isInGuestWifiGroup}
    return jsonify(current_user)

@app.route("/users")
def seznam():
    r=requests.get(f"{snipeit}users/", headers = HEADERS, verify=False)
    data = r.json()
    zamestnanci = {"zamestnanci": data["rows"]}
    is_in_guestWifi_group = isInGuesWifiGroup()

    return json.dumps(zamestnanci)

    return render_template('seznam.html', navbar = [CURRENT_USER, is_in_guestWifi_group], zamestnanci = zamestnanci)

@app.route("/users/<id>/assets")
def user_asset(id):
    r=requests.get(f"{snipeit}users/{id}/assets", headers = HEADERS, verify=False)
    data = r.json()
    assets = {"assets": data["rows"]}
    return json.dumps(assets)

@app.route("/hardware")
def hardware():
    r=requests.get(f"{snipeit}hardware/", headers = HEADERS, verify=False)
    data = r.json()
    hardware = data["rows"]
    return json.dumps(hardware)

@cross_origin(origin='*')
@app.route("/hardware/<id>")
def specificHardware(id):
    r=requests.get(f"{snipeit}hardware/{id}", headers = HEADERS, verify=False)
    data = r.json()
    return json.dumps(data)

@app.route("/members")
def members():
    return{"members":["Member1", "Member2", "Member3", "Member4", "Member5", "Members"]}

def isInGuesWifiGroup():
    server = Server(ldap_server, get_info=ALL)
    connection = Connection(server,
                            user=ldap_user_name,
                            password=ldap_password,
                            auto_bind=True)
    connection.search(root_dn, f'(&(objectclass=user)(sAMAccountName={CURRENT_USER}))', attributes=['memberOf','mail','uid'])
    HasAdmin = False
    for user in sorted(connection.entries):
        for group in user.memberOf:
            #print(group)
            if group.upper().find("CN="+"Guest_wifi".upper()) >= 0:
                HasAdmin = True

    print("Je GuestWifi:", HasAdmin)
    return HasAdmin

if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
