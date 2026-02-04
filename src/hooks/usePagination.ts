import fhirclient from "fhirclient";
import { useCallback, useState } from "react";
import { useNotification } from "../context/NotificationContext";

const client = fhirclient.client("https://r4.smarthealthit.org");

export const usePagination = () => {
  const { showNotification } = useNotification();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  const loadInitial = useCallback(async () => {
    try {
      setLoading(true);
      const bundle = await client.request("Patient?_count=10");
      setPatients(bundle.entry?.map((e: any) => e.resource) || []);
    } catch (err: any) {
      showNotification(`FHIR List Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  const handlePageChange = async (
    _: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    try {
      setLoading(true);
      const offset = (value - 1) * 10;
      const bundle = await client.request(
        `Patient?_count=10&_getpagesoffset=${offset}`,
      );
      if (bundle.entry) {
        setPatients(bundle.entry.map((e: any) => e.resource));
        setPage(value);
      }
    } catch (err: any) {
      showNotification(`Pagination Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return { patients, loading, page, handlePageChange, loadInitial };
};
