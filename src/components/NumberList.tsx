const NumberList = ({ numbers }: {numbers: number[]}) => {
    return (
    <ul className="list-group list-group-horizontal">
      {numbers.map((num) => (
        <li key={num} className="list-group-item">
          {num}
        </li>
      ))}
    </ul>
  );
}

export default NumberList