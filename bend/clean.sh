rm db.sqlite3
rm -rf src/api/migrations
mkdir src/api/migrations
touch src/api/migrations/__init__.py
./run.sh makemigrations
./run.sh migrate
