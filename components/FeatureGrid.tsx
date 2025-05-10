import FeatureCard from "./FeatureCard";

const features = [
  {
    number: "01",
    title: "Building A Trust Proven Network",
    description:
      "Create your own network with users that you decided to trust, grow your network by connecting with high-scoring users, from DeFi traders to DAO members.",
    className:
      "md:col-start-1 md:row-start-1 md:self-start rounded-t-xl rounded-bl-xl",
  },
  {
    number: "02",
    title: "Build A Safer Space",
    description:
      "Free Network of scammers and bots, powered by ROFL Agent and privacy tech.",
    className: "md:col-start-2 md:row-start-2 md:self-end  rounded-r-xl ",
  },
  {
    number: "03",
    title: "Non-Distance Trust",
    description:
      "You can now trust your crypto friend whose face you've never seen or voice you've never heard, not just through their vibe, but through their transactions too.",
    className:
      "md:col-start-1 md:row-start-3 md:self-end  rounded-b-xl rounded-tl-xl",
  },
];

const FeatureGrid = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-16 mb-12 gap-y-6">
      <FeatureCard {...features[0]} />

      <FeatureCard {...features[1]} />

      <FeatureCard {...features[2]} />
    </div>
  );
};

export default FeatureGrid;
