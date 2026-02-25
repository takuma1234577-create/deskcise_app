interface DisclaimerProps {
  className?: string;
}

export function Disclaimer({ className }: DisclaimerProps) {
  return (
    <section className={className}>
      <p className="text-[10px] leading-relaxed text-muted-foreground/80">
        ※ 本アプリの「寿命リカバリー」は、公開されている研究データをもとにしたシミュレーション値であり、
        実際の寿命や健康結果を直接示すものではありません。
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground/80">
        ※ 本アプリは医療機器ではなく、健康改善・疾病予防・治療効果を保証するものではありません。
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground/80">
        ※ 運動の実施は利用者自身の責任で行ってください。運動中または運動後に生じた怪我・体調不良等について、
        開発者は責任を負いません。
      </p>
    </section>
  );
}
