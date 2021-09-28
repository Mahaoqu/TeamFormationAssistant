# import time
from flask import Flask
from .TeamAssigner import assignTeam

app = Flask(__name__)


@app.route("/executeAlgo")
def execute_algo():
    assignTeam()
    return {
        "msg": "success",
    }

@app.route("/executeCand")
def execute_cand():
    assignCandidate()
    return {
        "msg": "CandidateAssigner success",
    }
