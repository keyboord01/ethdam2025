interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`bg-[#D7CEFF] p-8 sm:p-10 ${className}`}>
      <div className="text-8xl sm:text-8xl font-extrabold text-gray-400 opacity-50 mb-3 sm:mb-4">
        {number}
      </div>
      <div className="font-bold text-xl sm:text-4xl mb-2 sm:mb-3 text-black">
        {title}
      </div>
      <div className="text-xl sm:text-base text-neutral-700 leading-relaxed">
        {description}
      </div>
    </div>
  );
};

export default FeatureCard;
