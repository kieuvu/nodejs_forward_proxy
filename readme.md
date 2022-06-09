# Cấu hình Nginx

Di chuyển vào:
```bash
❯ cd /etc/nginx/sites-available
```

Tạo file config:
```bash
❯ sudo touch forwarder.conf
```

Sửa file config:
```bash
❯ sudo gedit forwarder.conf

server{
    listen 80;
    server_name forwarder.local;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3903;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Link đến site-enable:
```bash
❯ sudo ln -s /etc/nginx/sites-available/forwarder.conf /etc/nginx/sites-enabled/
```

Sửa file host:
```bash
❯ cd sudo gedit /etc/hosts

127.0.0.1	forwarder.local
```
Tắt server node -> khởi động lại -> restart Nginx:
```bash
❯ sudo systemctl restart nginx
```