/**
 * create by wl on 2021/3/4
 * 类注释：激活流程
 * 备注：
 */
export default {
	methods: {
		//liuchengjihuo
		lcjh(url, pcsAvyId, multiTenancyId, processInstId, code, id, type,manager='',unitId='') {
			this.$confirm("系统将删除办结库及待归档库中的办结文件，是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$post
						.postData(
							url,
							JSON.stringify({
								function: url,
								pcsAvyId: pcsAvyId,
								multiTenancyId: multiTenancyId,
								processInstId: processInstId,
								id:id,
								receiveType:type,
								manager:manager,
								unitId:unitId
							}),
							code
						)
						.then(res => {
							if (res.success) {
								this.$message({
									type: "success",
									showClose: true,
									offset: 400,
									message: "文档已重新流转",
									duration: 1500
								});
								window.location.reload();
								window.opener.location.reload();
							}
						});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消操作"
					});
				});

		},
	},
}
