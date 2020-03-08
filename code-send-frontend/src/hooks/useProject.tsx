import { useEffect, useContext } from "react";
import { ProjectFormValues } from "interfaces/Project";
import codeSendService from "utils/api/codeSendService";
import { projectContext } from "contexts/projectContext";

export const useGetAllProject = () => {
  const {
    setProjects,
    setLoading,
    setError,
    setSuccess,
    projects,
    loading,
    error,
    success,
    handleErrorIndicator
  } = useContext(projectContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const projects = await codeSendService.getallProjects();
        setProjects(projects);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
        handleErrorIndicator("Failed", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setProjects, setLoading, setError, setSuccess, handleErrorIndicator]);

  return { projects, loading, error, success };
};

export const useCreateProject = () => {
  const {
    setLoading,
    setError,
    setSuccess,
    loading,
    error,
    success,
    handleSuccessIndicator,
    handleErrorIndicator
  } = useContext(projectContext);

  const createProject = async (projectFormValues: ProjectFormValues) => {
    try {
      setLoading(true);
      await codeSendService.createProject(projectFormValues);
      setSuccess(true);
      handleSuccessIndicator("Success", "Your project is successfully created");
    } catch (error) {
      setError(error.message);
      handleErrorIndicator("Failed", error.message);
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
