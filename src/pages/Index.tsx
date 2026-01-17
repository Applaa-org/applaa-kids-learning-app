import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Trophy, Star, Play, Users, Clock } from "lucide-react";
import { MadeWithApplaa } from "@/components/made-with-applaa";
import { useNavigate } from "@tanstack/react-router";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Subjects", icon: "🌟", color: "bg-purple-100" },
    { id: "math", name: "Math", icon: "🔢", color: "bg-blue-100" },
    { id: "science", name: "Science", icon: "🔬", color: "bg-green-100" },
    { id: "reading", name: "Reading", icon: "📚", color: "bg-orange-100" },
    { id: "art", name: "Art", icon: "🎨", color: "bg-pink-100" },
  ];

  const lessons = [
    {
      id: 1,
      title: "Counting to 20",
      category: "math",
      description: "Learn numbers and counting with fun animals!",
      difficulty: "Easy",
      duration: "10 min",
      completed: true,
      icon: "🦁",
      color: "from-blue-400 to-blue-600",
      route: "/math-lesson"
    },
    {
      id: 2,
      title: "Butterfly Life Cycle",
      category: "science",
      description: "Discover how butterflies grow and change!",
      difficulty: "Easy",
      duration: "15 min",
      completed: false,
      icon: "🦋",
      color: "from-green-400 to-green-600",
      route: "/science-lesson"
    },
    {
      id: 3,
      title: "ABC Adventures",
      category: "reading",
      description: "Meet the alphabet with silly characters!",
      difficulty: "Easy",
      duration: "20 min",
      completed: false,
      icon: "🎭",
      color: "from-orange-400 to-orange-600",
      route: "/reading-lesson"
    },
    {
      id: 4,
      title: "Shapes Everywhere",
      category: "math",
      description: "Find shapes in the world around us!",
      difficulty: "Easy",
      duration: "12 min",
      completed: false,
      icon: "🔺",
      color: "from-blue-400 to-blue-600",
      route: "/math-lesson"
    },
    {
      id: 5,
      title: "Plant Growth",
      category: "science",
      description: "Watch our seeds sprout and grow!",
      difficulty: "Medium",
      duration: "25 min",
      completed: true,
      icon: "🌱",
      color: "from-green-400 to-green-600",
      route: "/science-lesson"
    },
    {
      id: 6,
      title: "Color Mixing Magic",
      category: "art",
      description: "Create new colors with primary colors!",
      difficulty: "Easy",
      duration: "18 min",
      completed: false,
      icon: "🌈",
      color: "from-pink-400 to-pink-600",
      route: "/art-lesson"
    }
  ];

  const filteredLessons = selectedCategory === "all" 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const achievements = [
    { name: "First Lesson", icon: "🎯", earned: true },
    { name: "Quiz Master", icon: "🏆", earned: true },
    { name: "Speed Learner", icon: "⚡", earned: false },
    { name: "Perfect Score", icon: "💯", earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  KidsLearn!
                </h1>
                <p className="text-sm text-gray-600">Fun Learning Adventures</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-700">125</span>
                <span className="text-yellow-600 text-sm">Points</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">👦</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Learning Adventure! 🌟
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Choose a subject and start exploring amazing new things!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex justify-center space-x-4">
          <Button 
            onClick={() => navigate({ to: "/quiz" })}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Take a Quiz! 🧠
          </Button>
          <Button 
            onClick={() => navigate({ to: "/math-lesson" })}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Book className="w-4 h-4 mr-2" />
            Start Learning 📚
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Choose a Subject:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : `${category.color} text-gray-700 hover:shadow-md`
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Fun Lessons</h3>
            <Badge variant="secondary" className="text-sm">
              {filteredLessons.length} activities
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <div className={`h-32 bg-gradient-to-r ${lesson.color} flex items-center justify-center`}>
                  <div className="text-6xl">{lesson.icon}</div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    {lesson.completed && <Trophy className="w-5 h-5 text-yellow-500" />}
                  </div>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                    </span>
                    <Badge variant="secondary">{lesson.difficulty}</Badge>
                  </div>
                  <Button 
                    onClick={() => navigate({ to: lesson.route as any })}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Adventure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Your Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-all duration-200 ${
                  achievement.earned
                    ? "bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg"
                    : "bg-gray-100 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-medium text-gray-700">{achievement.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25</div>
              <div className="text-sm text-gray-600">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
          </div>
        </div>
      </main>

      <MadeWithApplaa />
    </div>
  );
};

export default Index;