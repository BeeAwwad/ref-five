import { MatchSetupForm } from "../src/components/match-setup/MatchSetupForm";

export const SetupPage = () => {
  return (
    <section className="sm:mt-2">
      <h2 className="scroll-m-20 py-5 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create Match
      </h2>
      <MatchSetupForm />
    </section>
  );
};
