import { Injectable } from '@nestjs/common';
import { DragonsQuery } from './graphql/generated';
import { DragonsDocument } from './graphql/dragons.graphql';

@Injectable()
export class AppService {
  private readonly endpoint = 'https://spacex-production.up.railway.app/';

  async getHello(): Promise<string> {
    const { request } = await import('graphql-request');

    try {
      const data = await request<DragonsQuery>(this.endpoint, DragonsDocument);
      const dragons = data.dragons ?? [];
      return `SpaceX Dragons: ${dragons
        .filter(
          (dragon): dragon is NonNullable<typeof dragon> => dragon !== null,
        )
        .map(
          (dragon) =>
            `${dragon.name ?? 'Unknown'} (First flight: ${dragon.first_flight ?? 'Unknown'}, Diameter: ${dragon.diameter?.feet ?? 'Unknown'}ft, Payload: ${dragon.launch_payload_mass?.lb ?? 'Unknown'}lb)`,
        )
        .join('; ')}`;
    } catch (error) {
      console.error('Error fetching SpaceX data:', error);
      return 'Error fetching SpaceX data';
    }
  }
}
