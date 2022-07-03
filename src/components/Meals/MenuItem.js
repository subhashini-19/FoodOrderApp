import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <li>
      <div className={classes.meal}>
        <div>
          <h3>{props.item.name}</h3>
          <div className={classes.description}>{props.item.description}</div>
          <div className={classes.price}>{props.item.price}</div>
        </div>
        <div></div>
      </div>
    </li>
  );
};

export default MenuItem;
