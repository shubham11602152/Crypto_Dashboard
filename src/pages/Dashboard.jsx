import { Button, Table } from "antd";
import React, { Component } from "react";
import {
  toSecondDecimal,
  toCurrencyUSD,
  toIconURL,
} from "../common/utils/utilityFunc";
import { toCurrencyData } from "../mapper/currencyData-mapper";
import classes from "./Dashboard.module.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pageSize: 50,
      currentSize: null,
      isDisabledLoadMore: false,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentDidMount() {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        //set data & currentSize
        this.setState({
          data: toCurrencyData(data.data),
          currentSize: this.state.pageSize,
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    const { data, currentSize } = this.state;
    if (prevState.currentSize !== currentSize) {
      //if no. of items displayed are greater than or equal to total data
      // then disable load more button
      if (currentSize >= data.length) {
        this.setState({ isDisabledLoadMore: true });
      }
    }
  }

  handleLoadMore() {
    const { data, currentSize, pageSize } = this.state;
    if (currentSize < data.length)
      this.setState({ currentSize: currentSize + pageSize });
    else this.setState({ isDisabledLoadMore: true });
  }

  render() {
    const {
      data: dataSource,
      currentSize,
      isDisabledLoadMore,
      handleLoadMore,
    } = this.state;

    const iconURL = "https://assets.coincap.io/assets/icons";
    const columns = [
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        sorter: (a, b) => a.rank - b.rank,
        sortDirections: ["descend"],
        align: "center",
        responsive: ["sm", "md"],
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"],
        render: (text, a) => (
          <div className={classes.iconContainer}>
            <img
              src={toIconURL(iconURL, a.symbol)}
              className={classes.iconImg}
            />
            <a href={a.explorer} className={classes.iconLink}>
              <span>{text}</span>
              <span className={classes.secondary}>{a.symbol}</span>
            </a>
          </div>
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
        sortDirections: ["descend"],
        render: (text) => toCurrencyUSD(text),
      },
      {
        title: "Market Cap",
        dataIndex: "marketCap",
        key: "marketCap",
        responsive: ["md"],
        render: (text) => toCurrencyUSD(text),
      },
      {
        title: "VWAP (24Hr)",
        dataIndex: "vwap",
        key: "vwap",
        responsive: ["lg"],
        render: (text) => toCurrencyUSD(text),
      },
      {
        title: "Supply",
        dataIndex: "supply",
        key: "supply",
        responsive: ["lg"],
        render: (text) => toSecondDecimal(text),
      },
      {
        title: "Volume (24Hr)",
        dataIndex: "volume",
        key: "volume",
        responsive: ["md"],
        render: (text) => toCurrencyUSD(text),
      },
      {
        title: "Change (24Hr)",
        dataIndex: "changePercent",
        key: "changePercent",
        render: (text) => toSecondDecimal(text, "%"),
      },
    ];

    if (!dataSource) return <div className="loader">Loading...</div>;

    return (
      <Table
        dataSource={dataSource.slice(0, currentSize)}
        footer={() => (
          <Button
            disabled={isDisabledLoadMore}
            onClick={this.handleLoadMore}
            type="primary"
          >
            Load more
          </Button>
        )}
        pagination={false}
        columns={columns}
        bordered={false}
      />
    );
  }
}
