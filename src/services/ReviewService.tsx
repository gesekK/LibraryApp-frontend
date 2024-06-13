import axios from 'axios';
import { Review } from '../models/Review';

const API_URL = 'http://localhost:8080/reviews';

class ReviewService {
  getToken() {
    return localStorage.getItem('userToken');
  }

  async getAllReviews() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Review[]>(`${API_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getReviewsForBook(title: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Review[]>(`${API_URL}/book/${title}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getReviewsByUser(userId: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Review[]>(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addReview(review: Review) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.post<Review>(`${API_URL}/add`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ReviewService();
