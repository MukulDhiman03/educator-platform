Open PuTTY
In Host Name (or IP address), enter:
ubuntu@13.201.230.224
Port: 22

Connection type: SSH

Add Your .ppk Private Key
In the left panel, go to:

Connection → SSH → Auth

Click Browse, and select your file: aps AI_Demo.ppk

npm run build

sudo cp -r build/ /var/www/react-app
sudo systemctl reload nginx

backed

python3 -m venv env
source env/bin/activate
pip install -r req.txt

sudo nano /etc/nginx/sites-available/default

uvicorn api:app --host 0.0.0.0 --port 8004 --reload
nohup uvicorn api:app --host 0.0.0.0 --port 8004 --reload > logs.log 2>&1 &
