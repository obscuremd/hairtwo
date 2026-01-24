import { Badge } from "@/components/ui/badge";

export default function JobDescription() {
  return (
    <div className="bg-white dark:bg-muted rounded-2xl p-6 space-y-8">
      {/* OVERVIEW */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Job Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <Info label="Position" value="Barber" />
          <Info label="Job Type" value="Full Time" />
          <Info label="Experience" value="2+ Years" />
          <Info label="Qualification" value="WAEC" />
          <Info label="Salary" value="₦40,000 – ₦50,000" highlight />
          <Info label="Location" value="Surulere, Lagos" />
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Job Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          We are looking for a professional and experienced barber to join our
          growing team. The ideal candidate should be skilled in modern and
          classic grooming techniques, customer-focused, and passionate about
          delivering top-quality service.
        </p>
      </section>

      {/* REQUIREMENTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Requirements</h2>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>Minimum of 2 years professional experience</li>
          <li>Ability to handle modern and classic haircuts</li>
          <li>Good communication and customer service skills</li>
          <li>Neat appearance and professional attitude</li>
        </ul>
      </section>

      {/* TAGS */}
      <section className="flex flex-wrap gap-2">
        <Badge>Barber</Badge>
        <Badge variant="secondary">Full Time</Badge>
        <Badge variant="outline">Surulere</Badge>
      </section>
    </div>
  );
}

function Info({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}
