import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";

const questions = [
  {
    id: 1,
    question: "Which event marked the beginning of Boston University's response to the AIDS crisis?",
    options: [
      "AIDS Crisis at BU",
      "A critical article published arguing against awareness",
      "An article arguing for awareness",
      "None of the above"
    ],
    correctAnswer: 0,
    explanation: "In January 1987, skyrocketing HIV/AIDS rates in the Boston area led BU to form a task force, marking the start of its response to the crisis."
  },
  {
    id: 2,
    question: "What was the effect of the controversial article published on February 2, 1987?",
    options: [
      "It led to increased activism for AIDS awareness",
      "It resolved the crisis immediately",
      "It was ignored by the BU community",
      "It diminished the urgency of the issue"
    ],
    correctAnswer: 0,
    explanation: "Despite its critical tone, the article sparked heated debates on campus and ultimately spurred increased activism in support of AIDS awareness."
  },
  {
    id: 3,
    question: "Which event directly countered the earlier critical article?",
    options: [
      "AIDS Crisis at BU",
      "A critical article published arguing against awareness",
      "An article arguing for awareness",
      "A follow-up editorial on personal freedoms"
    ],
    correctAnswer: 2,
    explanation: "On February 19, 1987, a supportive article was published that directly responded to the earlier piece by advocating for increased awareness and action."
  }
];

const MultipleChoiceQuizPage = () => {
  const navigate = useNavigate();

  const handleQuizComplete = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/quiz">
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Timeline Quiz
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
            >
              Knowledge Check
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight text-emerald-800 sm:text-5xl md:text-6xl"
            >
              Multiple Choice Quiz
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-3 max-w-md text-base text-emerald-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            >
              Test your knowledge about our journey with these questions!
            </motion.p>
          </div>

          <MultipleChoiceQuiz 
            questions={questions} 
            onFinish={handleQuizComplete}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuizPage;
