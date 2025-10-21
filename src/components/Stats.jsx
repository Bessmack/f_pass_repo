
const Stats = () => {
  const statsData = [
    {
      title: "Total Users",
      value: "5",
      change: "+8.2%",
      trend: "up",
      icon: "👥"
    },
    {
      title: "Active Users",
      value: "4",
      change: "+5.4%",
      trend: "up",
      icon: "⚡"
    },
    {
      title: "Total Revenue",
      value: "$15,200",
      change: "+12.5%",
      trend: "up",
      icon: "💸"
    },
    {
      title: "Avg. Transaction",
      value: "$215",
      change: "-2.1%",
      trend: "down",
      icon: "📊"
    }
  ];

  return (
    <div className="stats-container">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.trend}`}>
              {stat.change}
            </div>
          </div>
          <div className="stat-decoration">
            <div className="stat-orb">
              <span className="stat-icon">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;