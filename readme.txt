To run this application, first

1) cd my-nest-app
2) open request.http and run this file by sending request
3) Now, In a new terminal, cd my-nest-app-frontend
4) Here, run "npm run dev"


Before all of the above:

1) open pgadmin4, so that database is active
2) in a new terminal, "write docker start elasticsearch


libraries to download:

1) npm install @nestjs/elasticsearch @elastic/elasticsearch
2) docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.15.3
3) docker start elastic search
