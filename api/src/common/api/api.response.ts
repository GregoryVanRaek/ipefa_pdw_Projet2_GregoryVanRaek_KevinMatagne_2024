// Réponse envoyée peu importe le succès ou non de la requete
import {ApiCodeResponse} from './api-code.response';

export interface ApiResponse {
  result: boolean;
  code: ApiCodeResponse;
  data: any;
}