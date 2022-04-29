const History = ({ hours }) => {
  return (
    <div>
      {hours?.map((hour) => (
        <div>
          <p>{hour.temp_c}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
