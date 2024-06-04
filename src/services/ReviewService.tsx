import axios from 'axios';
import { Review } from '../models/Review';

const API_URL = 'http://localhost:8080/reviews';

class ReviewService {
  async getAllReviews() {
    return axios.get<Review[]>(`${API_URL}/getAll`);
  }

  async getReviewsForBook(title: string) {
    return axios.get<Review[]>(`${API_URL}/book/${title}`);
  }

  async getReviewsByUser(userId: number) {
    return axios.get<Review[]>(`${API_URL}/user/${userId}`);
  }

  async addReview(review: Review) {
    return axios.post<Review>(`${API_URL}/add`, review);
  }
}

export default new ReviewService();
