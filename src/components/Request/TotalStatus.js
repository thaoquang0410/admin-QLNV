import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../asset/css/Request.css';
import { getTotalRequests } from "../../store/actions/requests";
import { useCondition } from "./../../hooks/useCondition";

export default function TotalStatus() {
    const totalRequest = useSelector((state) => state.requests.totalRequest)
    const dispatch = useDispatch();
    const { onSuccess, onError } = useCondition();
    useEffect(() => {
        dispatch(getTotalRequests(onSuccess, onError))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const parent = totalRequest;
    const sum = parent.map((item) => {
        let sumTotals = 0;
        return (
            sumTotals += item.totals
        )
    })
    const totalSum = sum[0] + sum[1] + sum[2];
    const valueOpen = Math.floor((sum[0] / totalSum) * 100);
    const valueProcess = Math.floor((sum[1] / totalSum) * 100);
    const valueClose = 100 - (valueOpen + valueProcess)
    // eslint-disable-next-line array-callback-return
    let values = parent && parent.map((item, i) => {
        if (item.status_id === 1) {
            return (

                // eslint-disable-next-line array-callback-return
                <div className="value" style={{ 'color': "#ff5c8d", 'width': valueOpen + '%' }} key={i}>
                    <span>{valueOpen}%</span>
                </div>
            )
        }
        if (item.status_id === 2) {
            return (
                <div className="value" style={{ 'color': "#00b48d", 'width': valueProcess + '%' }} key={i}>
                    <span>{valueProcess}%</span>
                </div>
            )
        }
        if (item.status_id === 3) {
            return (
                <div className="value" style={{ 'color': "#357c3c", 'width': valueClose + '%' }} key={i}>
                    <span>{valueClose}%</span>
                </div>
            )
        }
    }, this);

    // eslint-disable-next-line array-callback-return
    let bars = parent && parent.map(function (item, i) {
        if (item.status_id === 1) {
            return (
                <div className="bar" style={{ 'backgroundColor': "#ff5c8d", 'width': valueOpen + '%' }} key={i}>
                </div>
            )
        }
        if (item.status_id === 2) {
            return (
                <div className="bar" style={{ 'backgroundColor': "#00b48d", 'width': valueProcess + '%' }} key={i}>
                </div>
            )
        }
        if (item.status_id === 3) {
            return (
                <div className="bar" style={{ 'backgroundColor': "#357c3c", 'width': valueClose + '%' }} key={i}>
                </div>
            )
        }
    }, this);

    // eslint-disable-next-line array-callback-return
    let legends = parent.map(function (item, i) {
        if (item.status_id === 1) {
            return (
                <div className="legend" key={i}>
                    <span className="label" style={{ 'color': "#ff5c8d" }}>Open</span>
                    <span className="dot" style={{ 'color': '#fff', 'backgroundColor': "#ff5c8d" }}>{item.totals}</span>
                </div>
            )
        }
        if (item.status_id === 2) {
            return (
                <div className="legend" key={i}>
                    <span className="label" style={{ 'color': "#00b48d" }}>Processing</span>
                    <span className="dot" style={{ 'color': '#fff', 'backgroundColor': "#00b48d" }}>{item.totals}</span>
                </div>
            )
        }
        if (item.status_id === 3) {
            return (
                <div className="legend" key={i}>
                    <span className="label" style={{ 'color': "#357c3c" }}>Close</span>
                    <span className="dot" style={{ 'color': '#fff', 'backgroundColor': "#357c3c" }}>{item.totals}</span>
                </div>
            )
        }
    }, this
    );

    return (
        <div className="status_request">
            <div className="multicolor-bar" >
                <div className="values">
                    {values === '' ? '' : values}
                </div>
                <div className="bars">
                    {bars === '' ? '' : bars}
                </div>
                <div className="legends">
                    {legends === '' ? '' : legends}
                </div>
            </div>
        </div>
    )
}
