import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const algorithms = [
    {
      id: "two-sum",
      title: "Two Sum",
      category: "Arrays",
      difficulty: "Easy",
      description: "Encontre dois números em um array que somem um valor alvo específico.",
      leetcodeNumber: 1
    },
    {
      id: "three-sum",
      title: "Three Sum",
      category: "Arrays", 
      difficulty: "Medium",
      description: "Encontre todos os triplets únicos no array que somem zero.",
      leetcodeNumber: 15
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 dark:text-green-400";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "Hard":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Algoritmos LeetCode Animados
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize e aprenda algoritmos do LeetCode através de animações interativas educativas.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Arrays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algorithm) => (
              <Link key={algorithm.id} href={`/algorithms/${algorithm.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">
                        #{algorithm.leetcodeNumber}. {algorithm.title}
                      </CardTitle>
                      <span className={`text-sm font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                        {algorithm.difficulty}
                      </span>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {algorithm.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {algorithm.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
