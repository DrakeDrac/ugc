import requests
import ugc
import json

goal="TEWDQ"

auth="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFiNWMxMWU0YWIyZDZmNGM0ZjYzYjIzMGNlNjEwMTA0In0.eyJ1c2VyX2lkIjo4NDA0NzIwNiwidWlkIjoiVzZMREwxQVBPOSIsImRpZCI6IiIsImp0aSI6IjE6c3N3RHVXbmlCY1Jlc3JGZm05SXNMcThOS0FrVlozIiwiZXhwIjoxNzIyOTY3Mjg2LCJpYXQiOjE3MjAzNzUyODYsInR5cCI6MX0.UL6cQPWTKcmL72sFKbd0eBYKPByxbXoJDVlX3hNSed61aEeVhI41Or85TJVYoAi93C6Cei7emZ3kM3ahPTkMUE87QYEC_fjK1ahOodJm3xeYu9wF3A-McwEJVPh1deaYJe2dvL4qdoDCudYP9ht9prUmSeC_jElpCmjE9s26BpfOvavRLnKvub4WgRZV6Nn9-_AIBtd25qsQ6dt96Vyyhasb7r3-ODievTMO2l7D3zrN74Zmojz8XpnktsoIrqGCoZ-88gViQGRZeRY7NgNmo8E8gD8_H4yQSJLaXj5C4VzCPmjADdEnsETls-M3W1_MCKMmVuTtEAAuqSKPr6tTsQ"

burp0_url = f'https://api.unacademy.com:443/api/v1/uplus/subscription/goal_educators/?goal_uid={goal}&limit=100&offset=0'
burp0_headers = {"Sec-Ch-Ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\"", "Accept-Language": "en-GB", "Sec-Ch-Ua-Mobile": "?0", "Authorization": auth, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.57 Safari/537.36", "Content-Type": "application/json", "Accept": "*/*", "Sec-Ch-Ua-Platform": "\"macOS\"", "Origin": "https://unacademy.com", "Sec-Fetch-Site": "same-site", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "empty", "Referer": "https://unacademy.com/", "Accept-Encoding": "gzip, deflate, br", "Priority": "u=1, i"}
#r=requests.get(burp0_url, headers=burp0_headers)
#ok=r.json()
ok={}
with open("./educators.json", "r+") as f:
  ok=json.loads(f.read())
for x in ok['results']:
  ugc.saveEducator(x['username'], auth)