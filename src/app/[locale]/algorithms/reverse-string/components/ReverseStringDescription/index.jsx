import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const ReverseStringDescription = () => {
  const t = useTranslations('reverseString.description');

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
              <div><strong>{t('input')}</strong> s = ["h","e","l","l","o"]</div>
              <div><strong>{t('output')}</strong> ["o","l","l","e","h"]</div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">{t('example2')}</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>{t('input')}</strong> s = ["H","a","n","n","a","h"]</div>
              <div><strong>{t('output')}</strong> ["h","a","n","n","a","H"]</div>
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
          </ul>
        </CardContent>
      </Card>

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
};

export default ReverseStringDescription;
