import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        backgroundColor: "#ffffff",
        textColor: "rgba(0, 0, 0, 0.9)",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#4AFA9A",
      downColor: "#F34C44",
      borderVisible: false,
      wickUpColor: "#4AFA9A",
      wickDownColor: "#F34C44",
    });

    candlestickSeries.setData(
      data.map((dataPoint) => ({
        time: dataPoint.time,
        open: parseFloat(dataPoint.open),
        high: parseFloat(dataPoint.high),
        low: parseFloat(dataPoint.low),
        close: parseFloat(dataPoint.close),
      })),
    );

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default CryptoChart;
