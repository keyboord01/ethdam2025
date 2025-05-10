import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#bababa] p-8 rounded-lg ${className}`}
    >
      <div className="flex items-center mb-6">
        <div className="text-6xl font-extrabold text-[#242919] opacity-30 mr-4">
          {number}
        </div>
        <div className="h-px flex-grow bg-[#242919] opacity-20"></div>
      </div>

      <h3 className="font-bold text-2xl mb-4 text-black">{title}</h3>

      <p className="text-lg text-neutral-700">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
