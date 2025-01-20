from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sqlite.db"  # SQLite database file
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy and Flask-Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# Define the Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))

    def __repr__(self):
        return f"<Task {self.title}>"


# Routes
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify(
        [
            {"id": task.id, "title": task.title, "description": task.description}
            for task in tasks
        ]
    )


@app.route("/tasks", methods=["POST"])
def create_task():
    if not request.json or not "title" in request.json:
        abort(400)
    title = request.json["title"]
    description = request.json.get("description", "")
    task = Task(title=title, description=description)
    db.session.add(task)
    db.session.commit()
    return (
        jsonify({"id": task.id, "title": task.title, "description": task.description}),
        201,
    )


@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify(
        {"id": task.id, "title": task.title, "description": task.description}
    )


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    if not request.json:
        abort(400)
    task.title = request.json.get("title", task.title)
    task.description = request.json.get("description", task.description)
    db.session.commit()
    return jsonify(
        {"id": task.id, "title": task.title, "description": task.description}
    )


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"result": True})


if __name__ == "__main__":
    app.run(debug=True)
