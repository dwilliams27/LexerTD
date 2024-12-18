import { LocatableService } from "@/services/serviceLocator";

export abstract class Manager extends LocatableService {
  abstract update(): void;
}
