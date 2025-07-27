import axios from "axios";

const API_URL = "https://quirkle-bid-2.onrender.com/api/v1";

const createAuction = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/auctions/create-auction`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getAllAuctions = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auctions`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getSingleAuctionById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/auctions/${id}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return null;
  }
};

const updateAuctionStatus = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/auctions/${data.id}/status`,
      { status: data.status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const selectAuctionWinner = async (data) => {
  try {
    const response = await axios.get(
      `https://quirkle-bid-2.onrender.com/api/v1/bids/${data.id}/winner`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getSellerAuction = async () => {
  try {
    const response = await axios.get(`${API_URL}/auctions/user-auctions`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const deleteSingleAuctionById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auctions/delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const deleteAuctionByAdminById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auctions/admin-delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const updateSingleAuction = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/auctions/update/${data.id}`, data.data, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getWinnerDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/auctions/${id}/winner`, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getLiveAuctions = async () => {
  try {
    const response = await axios.get(`${API_URL}/auctions/live-auctions`, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getUpcomingAuctions = async () => {
  try {
    const response = await axios.get(`${API_URL}/auctions/upcoming-auctions`, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const updatePaymentStatus = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/auctions/update-payment-status/${id}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const auctionService = {
  getWinnerDetail,
  createAuction,
  getAllAuctions,
  getSingleAuctionById,
  updateAuctionStatus,
  selectAuctionWinner,
  getSellerAuction,
  deleteSingleAuctionById,
  updateSingleAuction,
  getLiveAuctions,
  getUpcomingAuctions,
  updatePaymentStatus,
  deleteAuctionByAdminById
};

export default auctionService;
