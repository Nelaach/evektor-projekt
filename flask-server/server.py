from ldap3 import Server, Connection, ALL, SUBTREE

from ldap3.core.exceptions import LDAPException, LDAPBindError
from flask import Flask, render_template
from dotenv import load_dotenv
load_dotenv()
import os
from getpass import getuser
import requests
import json

app = Flask(__name__)

# ldap
ldsp_server = os.getenv("LDSP_SERVER")
root_dn = os.getenv("ROOT_DN")
ldap_user_name = os.getenv("LDAP_USER_NAME")
ldap_password = os.getenv("LDAP_PASSWORD")
authorization = os.getenv("AUTHORIZATION")
snipeit = os.getenv("SNIPEIT")

current_user = getuser()
navbar = []

headers = { 
    'Content-Type': 'application/json',
    'Authorization' : authorization,
    'Accept':'application/json'}

@app.route("/")
def home():
    return render_template('home.html', navbar = [current_user, isInGuesWifiGroup()])

@app.route("/seznam")
def seznam():
    r=requests.get(f"{snipeit}users/", headers = headers, verify=False)
    data = r.json()
    zamestnanci = data["rows"]
    return render_template('seznam.html', navbar = [current_user, isInGuesWifiGroup()], zamestnanci = zamestnanci)

@app.route('/seznam/<id>')
def zamestnanec(id):
    return render_template('zamestnanec.html', navbar = [current_user, isInGuesWifiGroup()], id = id)
#    r=requests.get(f"{snipeit}hardware/", headers = headers, verify=False)
#    data = r.json()
#    assets = data["rows"] 
#    persons_asset=[]
#    for asset in assets:
#        print(id,asset["assigned_to"]["id"])
#        if int(asset["assigned_to"]["id"]) == int(id):
#            persons_asset = asset
#            break
#
#    return render_template('zamestnanec.html', navbar = [current_user, isInGuesWifiGroup()], persons_asset = persons_asset)

@app.route("/members")
def members():
    return{"members":["Member1", "Member2", "Member3", "Member4", "Member5", "Members"]}

def isInGuesWifiGroup():
    server = Server(ldsp_server, get_info=ALL)
    connection = Connection(server,
                            user=ldap_user_name,
                            password=ldap_password,
                            auto_bind=True)

    connection.search(root_dn, f'(&(objectclass=user)(sAMAccountName={current_user}))', attributes=['memberOf','mail','uid'])
    HasAdmin = False
    for user in sorted(connection.entries):
        print('uživatel: ', user)
        for group in user.memberOf:
            #print(group)
            if group.upper().find("CN="+"Guest_wifi".upper()) >= 0:
                HasAdmin = True

    print("Je GuestWifi:", HasAdmin)
    return(f"{HasAdmin}")

if __name__ == "__main__":
    app.run(debug=True)