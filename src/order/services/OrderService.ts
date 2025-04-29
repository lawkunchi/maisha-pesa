import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../common/services/firebase";

export const updateOrderStatus = async ({
  orderId,
  newStatus,
  actorId,
  roleId,
  actionTaken,
  extraFields = {},
}: {
  orderId: string;
  newStatus: string;
  actorId: string;
  roleId: string;
  actionTaken: string;
  extraFields?: Record<string, any>;
}) => {
  const orderRef = doc(db, "orders", orderId);

  const trackingEntry = {
    status: newStatus,
    actionTaken,
    roleId,
    userId: actorId,
    timestamp: new Date(),
  };

  await updateDoc(orderRef, {
    status: newStatus,
    tracking: arrayUnion(trackingEntry),
    ...extraFields,
  });
};
