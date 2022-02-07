from ldap3 import Server, Connection, ALL, SUBTREE
from ldap3.core.exceptions import LDAPException, LDAPBindError
from flask import Flask, render_template
from dotenv import load_dotenv
load_dotenv()
import os
from getpass import getuser

app = Flask(__name__)

# ldap server hostname and port
ldsp_server = os.getenv("LDSP_SERVER")
root_dn = os.getenv("ROOT_DN")
ldap_user_name = os.getenv("LDAP_USER_NAME")
ldap_password = os.getenv("LDAP_PASSWORD")
current_user = getuser()
navbar = []

@app.route("/")
def home():
    return render_template('home.html', navbar = [current_user, isInGuesWifiGroup()])

@app.route("/seznam")
def seznam():
    return render_template('seznam.html', navbar = [current_user, isInGuesWifiGroup()])

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
    return(f'{HasAdmin}')
if __name__ == "__main__":
    app.run(debug=True)