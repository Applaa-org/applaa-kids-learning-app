import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Play, Volume2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const MathLesson = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const lessonSteps = [
    {
      type: "introduction",
      title: "Numbers 1-5",
      content: "Let's learn about numbers from 1 to 5!",
      visual: "12345",
      audio: true
    },
    {
      type: "teaching",
      title: "Counting Fish",
      content: "Count the fish: 🐟🐟🐟 How many fish do you see?",
      correctAnswer: "3",
      visual: "🐟🐟🐟"
    },
    {
      type: "quiz",
      question: "How many apples are there? 🍎🍎🍎🍎",
      correctAnswer: "4",
      options: ["3", "4", "5"]
    },
    {
      type: "activity",
      title: "Number Matching",
      content: "Match the numbers to the pictures!",
      interactive: true
    }
  ];

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    const correct = answer === lessonSteps[currentStep]?.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < lessonSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Lesson complete - navigate to home with success message
        navigate({ to: "/" });
        // You could show a toast notification here instead of passing score
      }
      setUserAnswer("");
    }, 2000);
  };

  const progress = ((currentStep + 1) / lessonSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate({ to: "/" })}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-yellow-100 text-yellow-800">
            Score: {score}/{lessonSteps.length}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            Step {currentStep + 1} of {lessonSteps.length}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-3" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {lessonSteps[currentStep]?.title || "Math Lesson"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Content */}
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">
                  {lessonSteps[currentStep]?.visual || "📚"}
                </div>
                <p className="text-lg text-gray-700">
                  {lessonSteps[currentStep]?.content}
                </p>
              </div>

              {/* Interactive Elements */}
              <div className="space-y-4">
                {lessonSteps[currentStep]?.type === "quiz" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lessonSteps[currentStep].options?.map((option) => (
                      <Button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={showFeedback}
                        className="p-6 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {lessonSteps[currentStep]?.type === "teaching" && lessonSteps[currentStep]?.correctAnswer && (
                  <div className="text-center">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="text-center text-2xl p-4 border-2 border-gray-300 rounded-lg mb-4 w-32"
                      placeholder="?"
                      disabled={showFeedback}
                    />
                    <br />
                    <Button
                      onClick={() => handleAnswer(userAnswer)}
                      disabled={!userAnswer || showFeedback}
                      className="bg-gradient-to-r from-green-500 to-blue-500"
                    >
                      Check Answer
                    </Button>
                  </div>
                )}

                {lessonSteps[currentStep]?.type === "introduction" && (
                  <div className="text-center">
                    <Button 
                      onClick={() => handleAnswer("next")}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Learning!
                    </Button>
                  </div>
                )}

                {lessonSteps[currentStep]?.type === "activity" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <Button
                        key={num}
                        onClick={() => handleAnswer(num.toString())}
                        disabled={showFeedback}
                        className="p-8 text-2xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`text-center p-4 rounded-lg ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">
                      {isCorrect ? "Great job! 🎉" : "Try again! 💪"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Audio Controls */}
        {lessonSteps[currentStep]?.audio && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              className="border-dashed"
              onClick={() => {
                // Play audio functionality would go here
                console.log("Playing audio...");
              }}
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Play Audio
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600">
          You're doing great! Keep going! ⭐
        </p>
      </div>
    </div>
  );
};

export default MathLesson;