import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const RemoveDuplicatesDescription = () => {
  const t = useTranslations('removeDuplicates.description');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {t('problem')}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('return')}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('clarification')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('examples')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">{t('example1')}</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>{t('input')}</strong> nums = [1,1,2]</div>
              <div><strong>{t('output')}</strong> 2, nums = [1,2,_]</div>
              <div className="mt-2 text-muted-foreground">
                <strong>{t('explanation')}</strong> {t('example1Explanation')}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">{t('example2')}</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>{t('input')}</strong> nums = [0,0,1,1,1,2,2,3,3,4]</div>
              <div><strong>{t('output')}</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]</div>
              <div className="mt-2 text-muted-foreground">
                <strong>{t('explanation')}</strong> {t('example2Explanation')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('constraints')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">{t('constraint1')}</code></li>
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">{t('constraint2')}</code></li>
            <li>• <strong>{t('constraint3')}</strong></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoveDuplicatesDescription; 