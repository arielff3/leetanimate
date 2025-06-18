import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations('home');
  
  const algorithms = [
    {
      id: "two-sum",
      titleKey: "twoSum.title",
      category: "arrays",
      difficulty: "easy",
      descriptionKey: "twoSum.description",
      leetcodeNumber: 1
    },
    {
      id: "three-sum",
      titleKey: "threeSum.title",
      category: "arrays", 
      difficulty: "medium",
      descriptionKey: "threeSum.description",
      leetcodeNumber: 15
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "hard":
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
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">{t('categories.arrays')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algorithm) => (
              <Link key={algorithm.id} href={`/algorithms/${algorithm.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">
                        #{algorithm.leetcodeNumber}. {t(`algorithms.${algorithm.titleKey}`)}
                      </CardTitle>
                      <span className={`text-sm font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                        {t(`difficulty.${algorithm.difficulty}`)}
                      </span>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t(`categories.${algorithm.category}`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t(`algorithms.${algorithm.descriptionKey}`)}
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
};

export default Home;
