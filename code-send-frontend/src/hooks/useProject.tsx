import { useEffect, useContext } from "react";
import { ProjectFormValues } from "interfaces/Project";
import codeSendService from "utils/api/codeSendService";
import { projectContext } from "contexts/projectContext";
import { useNotification } from "hooks/useNotification";

export const useGetAllProject = () => {
  const {
    setProjects,
    setLoading,
    setError,
    setSuccess,
    projects,
    loading,
    error,
    success
  } = useContext(projectContext);
  const { handleError } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const projects = await codeSendService.getallProjects();
        setProjects(projects);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
        handleError("Failed", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setProjects, setLoading, setError, setSuccess, handleError]);

  return { projects, loading, error, success };
};

export const useCreateProject = () => {
  const {
    setLoading,
    setError,
    setSuccess,
    loading,
    error,
    success
  } = useContext(projectContext);
  const { handleSuccess, handleError } = useNotification();

  const createProject = async (projectFormValues: ProjectFormValues) => {
    try {
      setLoading(true);
      await codeSendService.createProject(projectFormValues);
      setSuccess(true);
      handleSuccess("Success", "Your project is successfully created");
    } catch (error) {
      setError(error.message);
      handleError("Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading,
    error,
    success
  };
};
