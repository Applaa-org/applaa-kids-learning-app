import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Clock, Star } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  // Sample quiz questions for kids
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "How many fingers do you have on one hand? 🖐️",
      options: ["3", "5", "4", "6"],
      correctAnswer: 1,
      explanation: "We have 5 fingers on each hand!",
      difficulty: "Easy",
      category: "Math"
    },
    {
      id: 2,
      question: "What color do you get when you mix red and yellow? 🎨",
      options: ["Green", "Purple", "Orange", "Blue"],
      correctAnswer: 2,
      explanation: "Red and yellow make orange!",
      difficulty: "Easy",
      category: "Art"
    },
    {
      id: 3,
      question: "Which animal says 'meow'? 🐱",
      options: ["Dog", "Cat", "Cow", "Sheep"],
      correctAnswer: 1,
      explanation: "Cats say meow!",
      difficulty: "Easy",
      category: "Animals"
    },
    {
      id: 4,
      question: "How many days are in a week? 📅",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation: "There are 7 days in a week!",
      difficulty: "Medium",
      category: "Time"
    },
    {
      id: 5,
      question: "What do plants need to grow? 🌱",
      options: ["Water and sunshine", "Candy", "Ice cream", "Toys"],
      correctAnswer: 0,
      explanation: "Plants need water, sunshine, and air to grow!",
      difficulty: "Medium",
      category: "Science"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, quizCompleted]);

  const handleTimeUp = () => {
    setShowResult(true);
    const isCorrect = false;
    setCorrectAnswers([...correctAnswers, isCorrect]);
    setTimeout(() => nextQuestion(), 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer! 🎯");
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newCorrectAnswers = [...correctAnswers, isCorrect];
    setCorrectAnswers(newCorrectAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! Great job! 🎉");
    } else {
      toast.error("Not quite right, but keep trying! 💪");
    }

    setShowResult(true);
    setTimeout(() => nextQuestion(), 2500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Calculate final score and show completion toast
      const percentage = Math.round((score / questions.length) * 100);
      let message = "";
      let stars = 1;
      
      if (percentage >= 80) {
        message = `Amazing! ${percentage}% correct! ⭐⭐⭐`;
        stars = 3;
      } else if (percentage >= 60) {
        message = `Great job! ${percentage}% correct! ⭐⭐`;
        stars = 2;
      } else {
        message = `Good effort! ${percentage}% correct! ⭐`;
        stars = 1;
      }
      
      toast.success(message);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setQuizCompleted(false);
    setCorrectAnswers([]);
  };

  const goHome = () => {
    navigate({ to: "/" });
  };

  // Question UI Component
  const QuestionDisplay = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            {questions[currentQuestion].category}
          </Badge>
          <Badge 
            className={
              questions[currentQuestion].difficulty === "Easy" 
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }
          >
            {questions[currentQuestion].difficulty}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className={`font-bold ${
            timeLeft <= 10 ? "text-red-600" : "text-gray-600"
          }`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {questions[currentQuestion].question}
        </h2>

        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(Number(value))}>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-colors">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-lg">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          correctAnswers[currentQuestion] 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {correctAnswers[currentQuestion] ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {correctAnswers[currentQuestion] ? "Correct! 🎉" : "Incorrect ❌"}
            </span>
          </div>
          <p className="text-sm">
            {questions[currentQuestion].explanation}
          </p>
        </div>
      )}

      {!showResult && (
        <Button 
          onClick={submitAnswer}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          disabled={selectedAnswer === null}
        >
          Submit Answer ✨
        </Button>
      )}
    </div>
  );

  // Results UI Component
  const ResultsDisplay = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">Quiz Completed! 🎉</h2>
        
        <div className="flex items-center justify-center space-x-2 text-3xl">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              {i < 5 - Math.floor(((questions.length - score) * 5) / questions.length) ? "⭐" : "☆"}
            </div>
          ))}
        </div>
        
        <p className="text-xl text-gray-600">
          You scored: <span className="font-bold text-purple-600">{score}</span> out of {questions.length}
        </p>
        
        <div className="text-lg">
          {(score / questions.length) >= 0.8 ? "🌟 Amazing work!" : (score / questions.length) >= 0.6 ? "👏 Great job!" : "💪 Keep practicing!"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={restartQuiz} variant="outline">
          Try Again
        </Button>
        <Button onClick={goHome} className="bg-gradient-to-r from-purple-500 to-pink-500">
          Back to Home
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Your Results:</h3>
        {questions.map((q, index) => (
          <div key={q.id} className="flex items-center justify-between py-1 text-sm">
            <span>Question {index + 1}</span>
            <span className={correctAnswers[index] ? "text-green-600" : "text-red-600"}>
              {correctAnswers[index] ? "✓" : "✗"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={goHome}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Exit</span>
          </Button>
          
          {!quizCompleted && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-700">{score}</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-center">
              {quizCompleted ? "Results" : "Fun Quiz Time! 🧠"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quizCompleted ? <ResultsDisplay /> : <QuestionDisplay />}
          </CardContent>
        </Card>

        {/* Progress indicator */}
        {!quizCompleted && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-600">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;