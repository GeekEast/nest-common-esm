export const DragonsDocument = `
query Dragons {
  dragons {
    name
    first_flight
    diameter {
      feet
    }
    launch_payload_mass {
      lb
    }
  }
}
`;
