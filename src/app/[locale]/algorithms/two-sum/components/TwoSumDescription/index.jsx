import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "next-intl";

export default function TwoSumDescription() {
  const t = useTranslations('twoSum.description');
  const locale = useLocale();
  
  const renderProblemText = () => {
    if (locale === 'pt') {
      return (
        <>
          Dado um array de inteiros <code className="bg-muted px-1 py-0.5 rounded text-sm">nums</code> e um inteiro <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>, 
          retorne os <em>índices dos dois números</em> que somam o valor <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>.
        </>
      );
    }
    return (
      <>
        Given an array of integers <code className="bg-muted px-1 py-0.5 rounded text-sm">nums</code> and an integer <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>, 
        return the <em>indices of the two numbers</em> such that they add up to <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>.
      </>
    );
  };

  const renderAssumptionText = () => {
    if (locale === 'pt') {
      return (
        <>
          Você pode assumir que cada entrada terá <strong>exatamente uma solução</strong>, e você não pode usar o mesmo elemento duas vezes.
        </>
      );
    }
    return (
      <>
        You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {renderProblemText()}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {renderAssumptionText()}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('order')}
          </p>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('examples')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Example 1 */}
          <div>
            <h4 className="font-semibold mb-2">{t('example1')}</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>{t('input')}</strong> nums = [2,7,11,15], target = 9</div>
              <div><strong>{t('output')}</strong> [0,1]</div>
              <div className="mt-2 text-muted-foreground">
                <strong>{t('explanation')}</strong> {t('example1Explanation')}
              </div>
            </div>
          </div>

          <Separator />

          {/* Example 2 */}
          <div>
            <h4 className="font-semibold mb-2">{t('example2')}</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>{t('input')}</strong> nums = [3,2,4], target = 6</div>
              <div><strong>{t('output')}</strong> [1,2]</div>
            </div>
          </div>

          <Separator />

          {/* Example 3 */}
          <div>
            <h4 className="font-semibold mb-2">{t('example3')}</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>{t('input')}</strong> nums = [3,3], target = 6</div>
              <div><strong>{t('output')}</strong> [0,1]</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constraints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('constraints')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">{t('constraint1')}</code></li>
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">{t('constraint2')}</code></li>
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">{t('constraint3')}</code></li>
            <li>• <strong>{t('constraint4')}</strong></li>
          </ul>
        </CardContent>
      </Card>

      {/* Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('followUp')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t('followUpText')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 