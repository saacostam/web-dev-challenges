import { BASE_URL } from "../../../../shared/async-state-management";
import { IBrandingRepository, IBrandingRepositoryPayload } from "../../domain";

export class BrandingRepository implements IBrandingRepository {
  async getAuthor(): Promise<IBrandingRepositoryPayload["GetAuthorOut"]> {
    const response = await fetch(new URL("static-data/me/get.json", BASE_URL));
    return response.json();
  }
}
