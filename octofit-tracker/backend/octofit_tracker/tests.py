from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name="Test User", email="test@example.com", team="Marvel")
        self.assertEqual(user.name, "Test User")
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.team, "Marvel")

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Marvel", members=["Test User"])
        self.assertEqual(team.name, "Marvel")
        self.assertIn("Test User", team.members)

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user="Test User", activity="Running", duration=30)
        self.assertEqual(activity.user, "Test User")
        self.assertEqual(activity.activity, "Running")
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(user="Test User", points=100)
        self.assertEqual(lb.user, "Test User")
        self.assertEqual(lb.points, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Strength", suggested_for="Marvel")
        self.assertEqual(workout.name, "Strength")
        self.assertEqual(workout.suggested_for, "Marvel")
