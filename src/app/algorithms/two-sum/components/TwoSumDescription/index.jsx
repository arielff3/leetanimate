import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TwoSumDescription() {
  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enunciado do Problema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Dado um array de inteiros <code className="bg-muted px-1 py-0.5 rounded text-sm">nums</code> e um inteiro <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>, 
            retorne os <em>índices dos dois números</em> que somam o valor <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Você pode assumir que cada entrada terá <strong>exatamente uma solução</strong>, e você não pode usar o mesmo elemento duas vezes.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Você pode retornar a resposta em qualquer ordem.
          </p>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exemplos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Example 1 */}
          <div>
            <h4 className="font-semibold mb-2">Exemplo 1:</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>Entrada:</strong> nums = [2,7,11,15], target = 9</div>
              <div><strong>Saída:</strong> [0,1]</div>
              <div className="mt-2 text-muted-foreground">
                <strong>Explicação:</strong> Porque nums[0] + nums[1] == 9, retornamos [0, 1].
              </div>
            </div>
          </div>

          <Separator />

          {/* Example 2 */}
          <div>
            <h4 className="font-semibold mb-2">Exemplo 2:</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>Entrada:</strong> nums = [3,2,4], target = 6</div>
              <div><strong>Saída:</strong> [1,2]</div>
            </div>
          </div>

          <Separator />

          {/* Example 3 */}
          <div>
            <h4 className="font-semibold mb-2">Exemplo 3:</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div><strong>Entrada:</strong> nums = [3,3], target = 6</div>
              <div><strong>Saída:</strong> [0,1]</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constraints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Restrições</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">2 ≤ nums.length ≤ 10⁴</code></li>
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">-10⁹ ≤ nums[i] ≤ 10⁹</code></li>
            <li>• <code className="bg-muted px-1 py-0.5 rounded text-sm">-10⁹ ≤ target ≤ 10⁹</code></li>
            <li>• <strong>Apenas uma resposta válida existe.</strong></li>
          </ul>
        </CardContent>
      </Card>

      {/* Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pergunta de Acompanhamento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Você consegue criar um algoritmo que seja mais eficiente que O(n²) em complexidade temporal?
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 