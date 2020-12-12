rm server/db.sqlite3
rm -rf server/api/migrations
mkdir server/api/migrations
touch server/api/migrations/__init__.py
./run.sh makemigrations
./run.sh migrate
