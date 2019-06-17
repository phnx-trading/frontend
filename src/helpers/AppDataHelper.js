'use strict';

import { $ } from './ApiHelper.js';

export const getExchanges = () => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};

export const getMarkets = (exchange) => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges/${ exchange }/markets`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};

export const getSymbol = (exchange, symbol) => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges/${ exchange }/markets/${ symbol }`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};

export const getSymbolTrades = (exchange, symbol) => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges/${ exchange }/markets/${ symbol }/trades`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};

export const getSymbolOrderbook = (exchange, symbol) => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges/${ exchange }/markets/${ symbol }/orderbook?agg`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};

export const getSymbolTicker = (exchange, symbol) => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges/${ exchange }/markets/${ symbol }/ticker`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};

export const getSymbolOHLCV = (exchange, symbol) => {
  return new Promise((resolve, reject) => {
    $({
      url: `/exchanges/${ exchange }/markets/${ symbol }/ohlcv`,
      api: `exchange`,
      success: ({ result }) => resolve(result),
      error: reject
    });
  });
};
