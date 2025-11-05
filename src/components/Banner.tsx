const Banner = () => {
  return (
    <div className="sticky top-0 z-50 bg-red-600 border-b border-red-700 overflow-hidden">
      <div className="relative w-full py-4 flex items-center">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-2xl font-bold text-white px-12">
            🎉 Nikola ist die Beste! 🎉
          </span>
          <span className="text-2xl font-bold text-white px-12">
            🎉 Nikola ist die Beste! 🎉
          </span>
          <span className="text-2xl font-bold text-white px-12">
            🎉 Nikola ist die Beste! 🎉
          </span>
          <span className="text-2xl font-bold text-white px-12">
            🎉 Nikola ist die Beste! 🎉
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
